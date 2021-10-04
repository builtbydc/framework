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
		setup = new File("./x-library/A-setup.js");
		source = new File("./y-create/source.js");
		structure = new File("./y-create/structure.js");
		components = new File("./x-library/B-components.js");
		output = new File("./z-page/B-output.js");

		styleIn = new File("./y-create/style.css");
		styleOut = new File("./z-page/C-style.css");

		if (!output.delete())
			System.out.println("B-output.js did not exist");
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
			System.out.println("C-style.css did not exist");
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

		Desktop desktop = Desktop.getDesktop();
		desktop.open(new File("./z-page/A-page.html"));
	}

}
