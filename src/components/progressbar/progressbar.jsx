function ProgressBar() {
  return (
    <div className="p-6 w-full md:w-1/2">
      <div className="flex justify-between">
        <h4 className="text-lg md:text-xl font-bold text-[#353535] font-[PTSans]">
          Creativity
        </h4>
        <h6 className="text-md text-[#353535] font-[PTSans]">72%</h6>
      </div>
      <progress
        className="progress progress-neutral w-full my-4"
        value="72"
        max="100"
      ></progress>

      <div className="flex justify-between">
        <h4 className="text-lg md:text-xl font-bold text-[#353535] font-[PTSans]">
          Advertising
        </h4>
        <h6 className="text-md text-[#353535] font-[PTSans]">84%</h6>
      </div>
      <progress
        className="progress progress-neutral w-full my-4"
        value="84"
        max="100"
      ></progress>

      <div className="flex justify-between">
        <h4 className="text-lg md:text-xl font-bold text-[#353535] font-[PTSans]">
          Design
        </h4>
        <h6 className="text-md text-[#353535] font-[PTSans]">72%</h6>
      </div>
      <progress
        className="progress progress-neutral w-full my-4"
        value="72"
        max="100"
      ></progress>
    </div>
  );
}

export default ProgressBar;
