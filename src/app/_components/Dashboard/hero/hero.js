import Image from "next/image";

const Hero = () => {
  return (
    <div>
      <Image
        src="/image.png"
        alt="hero"
        width={1920}
        height={1080}
        className="object-contain w-full h-auto"
      />
    </div>
  );
};

export default Hero;
