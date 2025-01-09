import java.util.Random;

public class Love {
    
    private String sender;
    private String recipient;

    // Constructor to initialize sender and recipient
    public Love(String sender, String recipient) {
        this.sender = sender;
        this.recipient = recipient;
    }

    // Method to generate a randomized love message
    public String generateLoveMessage() {
        String[] loveMessages = {
            sender + " loves " + recipient + " unconditionally!",
            recipient + " is the reason " + sender + " smiles every day.",
            sender + " will always be there for " + recipient + ".",
            sender + " can't imagine life without " + recipient + "!"
        };

        Random rand = new Random();
        return loveMessages[rand.nextInt(loveMessages.length)];
    }

    // Method to express love in a fun way
    public void expressLove() {
        System.out.println(generateLoveMessage());
    }

    // Inner class that does something extra to make it complicated
    public class Heart {
        private int heartRate;

        // Constructor to set the heart rate
        public Heart() {
            this.heartRate = 100; // Default heart rate
        }

        // Method to increase heart rate
        public void fallInLove() {
            heartRate += 20;
            System.out.println("The heart is racing at " + heartRate + " beats per minute, thanks to love!");
        }

        // Method to return heart rate
        public int getHeartRate() {
            return heartRate;
        }
    }

    public static void main(String[] args) {
        Love loveStory = new Love("You", "Me");

        // Express love in a randomized way
        loveStory.expressLove();

        // Create a Heart object and make it "fall in love"
        Love.Heart heart = loveStory.new Heart();
        heart.fallInLove();
    }
}