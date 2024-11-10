interface Testimonial {
    id: number;
    name: string;
    location: string;
    image: string;
    quote: string;
  }
  
  export const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Maya Sharma",
      location: "Kathmandu Valley",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces",
      quote:
        "I had the pleasure of working with Unity Works Cooperative, and it was an incredible experience. Their commitment to fostering collaboration and empowering young individuals like myself is truly inspiring. The team was supportive and guided me through each step, allowing me to contribute meaningfully to the projects. Unity Works Cooperative is not just a place for teamwork but also a platform for growth, learning, and making a real difference. I highly recommend them to anyone looking to be part of a collaborative and innovative community",
    },
    {
      id: 2,
      name: "Raj Kumar Shrestha",
      location: "Lalitpur",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces",
      quote:
        "Working with Unity Works Cooperative has been an eye-opening experience. Their unwavering commitment to nurturing talent and fostering an inclusive, collaborative environment makes it a truly unique space. The guidance and mentorship I received helped me develop new skills and increased my confidence in my work. Unity Works Cooperative is more than just a cooperative—it's a vibrant community that empowers individuals to make a positive impact. I wholeheartedly recommend joining them to anyone seeking growth, support, and meaningful work.",
    },
  ];