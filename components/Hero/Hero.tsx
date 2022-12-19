import React from 'react';


const Hero = (props: { headline: string; body: string; buttonUrl: string; buttonText: string }) => {
  return (
    <>
    <div className="herogradient w-full pt-16">
      <section className="max-w-screen-xl px-4 md:px-8 mx-auto">
       <div className="flex flex-wrap justify-between ">
          <div className="w-full lg:w-1/2 flex p-16 flex-col justify-center gap-4">
            <h1 className="text-white text-4xl font-bold mb-4 md:mb-8">{props.headline}</h1>

            <p className="max-w-md text-gray-400 text-sm leading-relaxed">{props.body}</p>

            
              <a href={props.buttonUrl}>
                <button className="bg-blue-900 hover:bg-blue-700 text-white font-bold h-10 w-20 md:h-14 md:w-28 rounded">
                  {props.buttonText}
                </button>
              </a>
            
          </div>

          <div className="w-full lg:w-1/2 flex">
            <div className="">
              <img src="https://d36ai2hkxl16us.cloudfront.net/thoughtindustries/image/upload/v1/course-uploads/26c7b423-83be-46fe-96c7-2df83ccb9d9c/sxj1smre28i2-11.png" loading="lazy" alt="Photo by Kaung Htet" className="w-full h-full object-cover object-center" />
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default Hero;
