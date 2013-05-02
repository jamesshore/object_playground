#!/usr/bin/perl

my @lines = <STDIN>;

foreach (@lines) {
	$_ =~ s/\n/\\n/g;
	print "\"$_\" +\n";
};
