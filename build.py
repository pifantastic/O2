"""
Getting It Together Build Script (GITBS) v%(VERSION)s

Synopsis: build.py [options]
	
	-b	Build the final .air file (will prompt for password)
	-d	Launch the application in the debugger
	-c	Recompile Google Closure templates
	-s	Create a new Self-Signed security certificate
	-t	Run the qUnit test application
	-h	This help message
"""

import os, sys, getopt, fnmatch, subprocess, shutil

VERSION = '0.1'
NAME = "O2.air"
COMPILE_TEMPLATES = False
BUILD_AIR_FILE = False
LAUNCH_DEBUGGER = False
CREATE_CERTIFICATE = False
RUN_TESTS = False
BUILD_PATH = "build"

templates = [
	(os.path.join("templates", "base.js"), os.path.join("templates", "base.soy")),
]

def usage():
	print __doc__ % globals()

def copy(src, dest):
	shutil.copy(src, dest)

def xcopy(src, dest):
	shutil.copytree(src, dest, ignore=ignore)

def ignore(src, names):
	results = []
	for name in names:
		if name.endswith(".svn"):
			results.append(name)
	return results
	
def locate(pattern, root=os.curdir):
    for path, dirs, files in os.walk(os.path.abspath(root)):
        for filename in fnmatch.filter(files, pattern):
            yield os.path.join(path, filename)
		
def compilejs(file):
	args = ['java', '-jar', os.path.join("tools", "yuicompressor-2.4.2.jar"), "--charset", "utf-8", "--type", "js", "-o", file, file]
	print "compiling %s" % file.strip()
	proc = subprocess.Popen(args, stdout=subprocess.PIPE)
	(stdoutdata, stderrdata) = proc.communicate()
	if proc.returncode != 0:
		sys.exit(1)
	else:
		print(stdoutdata)

def transfer():
	if not os.path.exists(BUILD_PATH):
		os.mkdir(BUILD_PATH)
	DEST = os.path.join(BUILD_PATH, "tmp")
	os.mkdir(DEST)
	copy("index.html", os.path.join(DEST, "index.html"))
	copy("config.xml", os.path.join(DEST, "config.xml"))
	copy("application.xml", os.path.join(DEST, "application.xml"))
	copy("certificate.pfx", os.path.join(DEST, "certificate.pfx"))
	xcopy("css", os.path.join(DEST, "css"))
	xcopy("js", os.path.join(DEST, "js"))
	xcopy("icons", os.path.join(DEST, "icons"))

if __name__ == "__main__":
	
	# Parse command line arguments
	try:
		opts, args = getopt.getopt(sys.argv[1:], "bdchst")
		if len(sys.argv) < 2:
			usage()
	except getopt.GetoptError, err:
		print str(err)
		usage()
		sys.exit(2)
	
	for o, a in opts:
		if o == "-c":
			COMPILE_TEMPLATES = True
		elif o == "-h":
			usage()
			sys.exit(2)
		elif o == "-b":
			BUILD_AIR_FILE = True
		elif o == "-d":
			LAUNCH_DEBUGGER = True
		elif o == "-s":
			CREATE_CERTIFICATE = True
		elif o == "-t":
			RUN_TESTS = True
		else:
			assert False, "unhandled option"
	
	# Compile Google Closure templates
	if COMPILE_TEMPLATES:
		print("Compiling templates")
		for template in templates:
			print "compiling %s" % template[1];
			jar = os.path.join("tools", "SoyToJsSrcCompiler.jar")
			result = os.system("java -jar %s --outputPathFormat %s %s" % (jar, template[0], template[1]))
			if result > 0: sys.exit("Error!")
	
	# Create a new security certificate
	if CREATE_CERTIFICATE:
		print("Creating certificate")
		password = raw_input("Please enter the password for the new certificate: ")
		result = os.system("adt -certificate -cn SelfSigned 1024-RSA certificate.pfx %s" % password)
		if result > 0: sys.exit("Error!")
	
	# Build AIR application file
	if BUILD_AIR_FILE:
		print("Building AIR application file")
		# transfer files
		transfer()
		# compile javascript
		[compilejs(file) for file in locate("*.js", os.path.join(os.curdir, BUILD_PATH))]
		# build tmp files
		curdir = os.getcwd()
		os.chdir(os.path.join(BUILD_PATH, "tmp"))
		saveas = ".." + os.sep + NAME
		result = os.system("adt -package -storetype pkcs12 -keystore certificate.pfx %s application.xml ." % saveas)
		os.chdir(curdir)
		shutil.rmtree(os.path.join(BUILD_PATH, "tmp"))
		if result > 0: sys.exit("Error!")
	
	# Launch application in AIR debugger
	if LAUNCH_DEBUGGER:
		print("Launching app in debugger")
		result = os.system("adl application.xml")
		if result > 0: sys.exit("Error!")

	# Launch QUnit test application
	if RUN_TESTS:
		print("Launching QUnit test app")
		result = os.system("adl tests/application.xml .")
		if result > 0: sys.exit("Error!")
		
	print("Exiting application")