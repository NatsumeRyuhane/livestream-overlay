'use client';

import { useProfile } from '@/lib/profileContext';
import Header from './Header';
import Footer from './Footer';
import DefaultLayout from './DefaultLayout';
import NoStageLayout from './NoStageLayout';

export default function OverlayRenderer() {
  const { profile, loading, error, isConnected, updateConfig } = useProfile();

  if (loading) {
    return (
      <div className="w-[1920px] h-[1080px] flex items-center justify-center bg-black text-white">
        <p className="text-2xl">Loading overlay...</p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="w-[1920px] h-[1080px] flex items-center justify-center bg-black text-white">
        <p className="text-2xl text-red-500">Error: {error || 'Profile not found'}</p>
      </div>
    );
  }

  const { config } = profile;

  const handleLayoutSwitch = () => {
    const newLayout = config.layout.activeLayout === 'default' ? 'no-stage' : 'default';
    updateConfig({
      layout: {
        activeLayout: newLayout,
      },
    });
  };

  const handleInfoBlocksUpdate = (infoblocks: typeof config.header.infoblocks) => {
    updateConfig({
      header: {
        ...config.header,
        infoblocks,
      },
    });
  };

  return (
    <div
      className="absolute top-0 left-0 w-[1920px] h-[1080px] bg-cover overflow-hidden flex-vertical"
      style={{ backgroundImage: "url('/images/background.png')" }}
    >
      {/* WebSocket connection status indicator */}
      <div className="absolute top-2 right-2 z-50">
        <div
          className={`w-3 h-3 rounded-full ${
            isConnected ? 'bg-green-500' : 'bg-red-500'
          }`}
          title={isConnected ? 'Connected' : 'Disconnected'}
        />
      </div>

      <div className="w-full h-[125px] box-border overflow-hidden">
        <Header
          config={config.header}
          onSwitchLayout={handleLayoutSwitch}
          onInfoBlocksUpdate={handleInfoBlocksUpdate}
        />
      </div>

      <div className="relative w-full overflow-hidden flex-grow">
        {config.layout.activeLayout === 'default' && <DefaultLayout />}
        {config.layout.activeLayout === 'no-stage' && <NoStageLayout />}
      </div>

      <div className="w-full h-[93.75px]">
        {config.footer.enabled && <Footer config={config.footer} />}
      </div>
    </div>
  );
}
