/**
 * This file creates data for the sunshine list javascript object, its source is uoit-sunshine.txt Which was made with my software sunshineList
 */

import java.util.*;
import java.io.*;

class createSunshine {

	static String filename = "uoit-sunshine.txt";

	static ArrayList<String> names = new ArrayList<String>();
	static ArrayList<String> salaries = new ArrayList<String>();

	public static void main(String args[]) throws Exception {

		BufferedReader br = new BufferedReader(new FileReader(filename));	

		String currentLine;

		while ((currentLine = br.readLine()) != null) {

			String[] parts = currentLine.split(", ");

			names.add(parts[1] + " " + parts[0]);

			salaries.add(parts[2]);

		}

		
		PrintWriter writer = new PrintWriter("PROF_SUNSHINE.js", "UTF-8");

		writer.println("var PROF_SUNSHINE = {");

		for (int i = 0; i < names.size(); i++) {

			if (i != names.size() - 1) {

				writer.println("'" + names.get(i) + "': '" + salaries.get(i) + "',");

			} else {

				writer.println("'" + names.get(i) + "': '" + salaries.get(i) + "'");

			}
		}

		writer.println("}");

		writer.close();

	}

}
