#!/usr/bin/perl

# Converts input into JavaScript. Intended to make it easier to generate code samples.
# To use:
# 1. Run this program from the terminal (`./convert_code.pl`).
# 2. Paste in code to convert.
# 3. Press ^D (control-D).
# 4. Copy output where it needs to go.

my @lines = <STDIN>;
foreach $line (@lines) {
	$line =~ s/\t/  /g;
	$line =~ s/\n/\\n/g;
	$line =~ s/\'/\\'/g;
};

$output = join "'+ \n'", @lines;
print "\n\nOUTPUT:\n";
print "'$output';\n";