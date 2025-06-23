/**
 * Beispiel mit 2 nebenläufigen Threads
 * 
 * @author Tobias Lauer
 */
public class Threading {

	// Methode, die von den Threads ausgeführt wird
	static void print_char(char ch) {
		for (int i=0; i<50; i++) {
			System.out.print(ch);
		}
	}

	// Programmstart
	public static void main(String[] args) {
		// Zeichen, die von jeweils einem Thread ausgegeben werden
		final char ch1 = '-', ch2 = '*';
		
		// Threads p1 und p2 erstellen
		Thread p1 = new Thread() {
			public void run() { print_char(ch1); }
		};
		
		Thread p2 = new Thread() {
			public void run() { print_char(ch2); }
		};
		
		// Threads starten
		p1.start(); p2.start();

		// Ende der Threads abwarten
		try {
			p1.join(); p2.join();
		} catch(InterruptedException e) {};
		//

		// Programm mit Ausgabe beenden
		System.out.print(" END ");
	}
}
