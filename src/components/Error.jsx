import EyesComponent from './FollowingEyes'; 

const ErrorPage = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden md:flex-row flex-col">
      {/* Left container - EyesComponent */}
      <div className="hidden md:flex flex-1 justify-center items-center sticky top-0 h-screen p-4">
        <div className="w-full max-w-xs mx-auto">
          <EyesComponent />
        </div>
      </div>
      
      {/* Right container - Error message */}
      <div className="flex-1 overflow-y-scroll h-full md:h-screen">
        <div className="flex h-screen justify-center items-center w-full">
          <div className="flex flex-col items-center space-y-4">
            <h1 className="text-2xl">404 Error</h1>
            <hr className="w-full border-t-1.5 border-black rounded" />
            <p className="text-md">
              Click <a href="/" className="text-[#6f02c6]">here</a> to get back to the home screen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
