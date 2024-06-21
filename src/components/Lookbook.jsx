import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const images = [];

for (let i = 1; i <= 50; i++) {
  images.push(`/src/assets/lookbook/${i}.webp`);
  images.push(`/src/assets/lookbook/${i}.gif`);
}

console.log(images); 
const Lookbook = () => {
  return (
    <div className="flex justify-center items-center min-h-screen py-20 px-16">
      <div className="w-full max-w-7xl">
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, }}
        >
          <Masonry gutter="16px">
            {images.map((image, i) => (
              <div key={i+"img"} className="flex justify-center items-center ">
                <img 
                  src={image}
                  className="block rounded-lg object-cover"
                  alt={`Gallery illustration ${i}`}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </div>
  );
};

export default Lookbook;
