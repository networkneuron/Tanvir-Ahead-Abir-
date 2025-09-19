
import React, { useState, useEffect, useCallback } from 'react';

const testimonials = [
  {
    quote: "Working with this team was a game-changer. Their creativity and professionalism exceeded all our expectations. The final video was simply stunning!",
    name: "Alex Johnson",
    title: "CEO, Tech Innovators",
    image: "https://picsum.photos/100/100?random=1",
  },
  {
    quote: "The community management service is top-notch. Our engagement has skyrocketed, and our brand presence has never been stronger. Highly recommended!",
    name: "Samantha Lee",
    title: "Marketing Director, ConnectCo",
    image: "https://picsum.photos/100/100?random=2",
  },
  {
    quote: "Their animation team brought our complex ideas to life with a simple and elegant explainer video. The process was seamless and the result was perfect.",
    name: "Michael Chen",
    title: "Founder, EduFuture",
    image: "https://picsum.photos/100/100?random=3",
  },
];

const TestimonialSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  return (
    <div className="relative w-full max-w-3xl mx-auto text-center">
        <div className="overflow-hidden relative h-64">
            {testimonials.map((testimonial, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                >
                    <div className="flex flex-col items-center justify-center h-full">
                        <p className="text-lg md:text-xl italic text-gray-300 mb-6">"{testimonial.quote}"</p>
                        <div className="flex items-center">
                            <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                            <div>
                                <p className="font-bold text-white">{testimonial.name}</p>
                                <p className="text-indigo-300 text-sm">{testimonial.title}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${currentIndex === index ? 'bg-indigo-500' : 'bg-gray-600 hover:bg-gray-500'}`}
                />
            ))}
        </div>

    </div>
  );
};

export default TestimonialSlider;
