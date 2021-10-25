import java.io.IOException;
import java.io.File;
import java.util.Scanner;
import java.io.FileWriter;
import java.io.BufferedWriter;
import java.awt.Desktop;

public class Compiler {

	static void combineFiles(File[] inputFiles, File outputFile) throws IOException {
		if (!outputFile.delete())
			System.out.println("Output file did not exist.");
		outputFile.createNewFile();

		String contents = "";
		Scanner fileScanner, contentsScanner;
		BufferedWriter writer;

		for (File file : inputFiles) {
			fileScanner = new Scanner(file);
			while (fileScanner.hasNextLine())
				contents += fileScanner.nextLine() + "\n";
			contents += "\n";
			fileScanner.close();
		}

		contentsScanner = new Scanner(contents);
		writer = new BufferedWriter(new FileWriter(outputFile));

		while (contentsScanner.hasNextLine())
			writer.write(contentsScanner.nextLine() + "\n");
		writer.flush();

		contentsScanner.close();
		writer.close();

	}

	public static void main(String[] args) throws IOException {
		File[] inputJSFiles = { new File("./library/components.js"), new File("./library/constructs.js"),
				new File("./create/source.js"), new File("./create/structure.js") };

		File outputJSFile = new File("./docs/RO-output.js");

		combineFiles(inputJSFiles, outputJSFile);

		File[] inputCSSFiles = { new File("./library/default.css"), new File("./create/style.css") };
		File outputCSSFile = new File("./docs/RO-output.css");

		combineFiles(inputCSSFiles, outputCSSFile);

		Desktop.getDesktop().open(new File("./docs/index.html"));
	}

}
