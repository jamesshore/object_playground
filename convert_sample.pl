#!/usr/bin/perl

# Converts input into JavaScript. Intended to make it easier to generate code samples.
# To use:
# 1. Run this program from the terminal (`./convert_sample.pl`).
# 2. Paste in code to convert.
# 3. Press ^D (control-D).
# 4. Make sure terminal window is wide enough to display output without wrapping.
# 5. Copy output into appropriate part of user_code.js.

my @lines = <STDIN>;
foreach $line (@lines) {
	$line =~ s/\\/\\\\/g;
	$line =~ s/\t/  /g;
	$line =~ s/\n/\\n/g;
	$line =~ s/\'/\\'/g;
};

$output = join "' + \n\t'", @lines;
print "\n\nOUTPUT:\n";
print "'$output'\n";
