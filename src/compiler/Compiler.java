package compiler;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;
import java.awt.Desktop;

public class Compiler {

	static File setup;
	static File source;
	static File structure;
	static File components;
	static File output;

	static Scanner fileScanner;
	static Scanner contentsScanner;

	static String contents = "";

	static BufferedWriter writer;

	public static void main(String[] args) throws IOException {
		setup = new File("./y-library/A-setup.js");
		source = new File("./z-create/source.js");
		structure = new File("./z-create/structure.js");
		components = new File("./y-library/B-components.js");
		output = new File("./output.js");
		if (!output.delete())
			System.out.println("output.js did not exist");

		output.createNewFile();

		fileScanner = new Scanner(setup);
		while (fileScanner.hasNextLine())
			contents = contents + fileScanner.nextLine() + "\n";
		contents += "\n";

		fileScanner = new Scanner(source);
		while (fileScanner.hasNextLine())
			contents = contents + fileScanner.nextLine() + "\n";
		contents += "\n";

		fileScanner = new Scanner(structure);
		while (fileScanner.hasNextLine())
			contents = contents + fileScanner.nextLine() + "\n";
		contents += "\n";

		fileScanner = new Scanner(components);
		while (fileScanner.hasNextLine())
			contents = contents + fileScanner.nextLine() + "\n";

		writer = new BufferedWriter(new FileWriter(output));
		contentsScanner = new Scanner(contents);

		while (contentsScanner.hasNextLine())
			writer.write(contentsScanner.nextLine() + "\n");

		writer.flush();

		Desktop desktop = Desktop.getDesktop();
		desktop.open(new File("./page.html"));
	}

}
