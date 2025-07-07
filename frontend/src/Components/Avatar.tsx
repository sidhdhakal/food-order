const Avatar = ({ name, picture, className }: { name?: string; picture: string, className?:string }) => {
  return (
    <div className={`w-12 aspect-square ${className}`}>
      {picture ? (
        <img
          src={
            picture ||
            "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
          }
          alt={name}
          className="w-12 aspect-square min-w-12 object-cover rounded-full mx-auto"
        />
      ) : (
        <div className="w-12 aspect-square flex justify-center items-center text-center  text-2xl font-semibold text-white rounded-full bg-orange-400">
          {name?.split(" ")[0][0]}
          {name?.split(' ').length==2 && name?.split(" ")[1][0]}
        </div>
      )}
    </div>
  );
};

export default Avatar;
