public class Threading_shared_resource {
  static char ch;
  static void print_star() {	
    try {
    	//for (int i=0; i<50; i++) {
    		ch = '*';
    		Thread.sleep(1);
    		System.out.print(ch);
    	//}
    } catch(InterruptedException e) {};
    //System.out.print(ch);
  }

  static void print_minus() {
    try {
    	//for (int i=0; i<50; i++) {
    		ch = '-';
      Thread.sleep(1);
      System.out.print(ch);
    	//}
   } catch(InterruptedException e) {};
    
  }

  public static void main(String[] args) {
    Thread p1 = new Thread() {
                  public void run() {
                	  //
                		  print_star(); 
                  }
                };
    Thread p2 = new Thread() {
                  public void run() { 
                	  // for (int i=0; i<50; i++)
                		  print_minus(); 
                  }
                };
    p1.start(); p2.start();

    try {
      p1.join(); p2.join();
    } catch(InterruptedException e) {};

    System.out.println(" END ");
  }
}
