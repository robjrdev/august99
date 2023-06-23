import { useEffect, useState } from 'react';

const SpaceXLaunches = () => {
  const [launchData, setLaunchData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const response = await fetch('https://api.spacexdata.com/v5/launches');
        const data = await response.json();
        setLaunchData(data);
      } catch (error) {
        console.error('Error fetching launch data:', error);
      }
    };

    fetchData();
  }, []);

  if (!launchData) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-4xl font-bold mb-4'>Latest SpaceX Launches</h1>
        <ul>
          <li className='bg-white rounded shadow-md p-4 mb-4'>
            <div className='bouncing-loader'>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-4xl font-bold mb-4'>Latest SpaceX Launches</h1>
      <ul>
        {launchData.map((launch) => (
          <li key={launch.id} className='bg-white rounded shadow-md p-4 mb-4'>
            <div className='flex items-center justify-between mb-2'>
              <h2 className='text-xl font-bold'>
                Flight Number: {launch.flight_number}
              </h2>
              <p className='text-gray-500'>
                ({new Date(launch.date_utc).getFullYear()})
              </p>
            </div>
            <p className='text-lg font-semibold mb-2'>{launch.name}</p>
            <p className='text-gray-600'>{launch.details}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpaceXLaunches;
