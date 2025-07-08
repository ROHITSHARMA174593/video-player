import PublicLayout from '@/Layouts/PublicLayout'
import React from 'react'

type DownloadPageProps = {
  theme: "light" | "dark";
};

const Download = ({ theme }: DownloadPageProps) => {
  return (
    <PublicLayout theme={theme}>
      <div className={`min-h-screen`}>
        <h1 className='text-2xl font-bold p-4'>Hello From Downloads Page</h1>
      </div>
    </PublicLayout>
  );
};

export default Download;
