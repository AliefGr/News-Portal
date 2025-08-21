import InfoPost from "./InfoPost";
type FeaturedPostProps = {
  image: string;
  source: string;
  date: string;
  title: string;
  description: string;
};

const FeaturedPost = ({ image, source, date, title, description }: FeaturedPostProps) => {
  return (
    <article>
      <div className='flex -mx-4'>
        <div className='w-8/12 px-4'>
          <img
            src={image}
            alt={title}
            className="w-full h-96 object-cover"
          />
        </div>
        <div className='w-4/12 px-4'>
          <InfoPost
            source={source}
            date={date}
            title={title}
            description={description}
          />
        </div>
      </div>
    </article>
  );
};

export default FeaturedPost
