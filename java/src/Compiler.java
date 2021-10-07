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

	static File styleIn;
	static File styleOut;

	static Scanner fileScanner;
	static Scanner contentsScanner;

	static String contents = "";

	static BufferedWriter writer;

	public static void main(String[] args) throws IOException {
		setup = new File("./library/setup.js");
		source = new File("./create/source.js");
		structure = new File("./create/structure.js");
		components = new File("./library/components.js");
		output = new File("./docs/output.js");

		styleIn = new File("./create/style.css");
		styleOut = new File("./docs/style.css");

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

		if (!styleOut.delete())
			System.out.println("style.css did not exist");
		styleOut.createNewFile();

		fileScanner = new Scanner(styleIn);
		contents = "";
		while (fileScanner.hasNextLine())
			contents = contents + fileScanner.nextLine() + "\n";

		writer = new BufferedWriter(new FileWriter(styleOut));
		contentsScanner = new Scanner(contents);

		while (contentsScanner.hasNextLine())
			writer.write(contentsScanner.nextLine() + "\n");
		writer.flush();

		Desktop.getDesktop().open(new File("./docs/index.html"));
	}

}
