import React, { useState, useRef, useEffect } from 'react';
import { Maximize, X, Loader2, Rotate3D } from 'lucide-react';
import { FoodItem } from '../types';

// Define the model-viewer element type for ref
type ModelViewerElement = HTMLElement & {
  activateAR: () => Promise<void>;
  canActivateAR: boolean;
};

interface ARViewerProps {
  item: FoodItem;
  onClose: () => void;
}

const ARViewer: React.FC<ARViewerProps> = ({ item, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [arSupported, setArSupported] = useState<boolean | null>(null);
  const modelViewerRef = useRef<ModelViewerElement | null>(null);

  useEffect(() => {
    const modelViewer = modelViewerRef.current;
    if (!modelViewer) return;

    const handleLoad = () => {
      console.log('Model loaded successfully');
      setLoading(false);
      setArSupported(modelViewer.canActivateAR);
      console.log('AR Supported:', modelViewer.canActivateAR);
    };

    const handleError = (e: any) => {
      console.error('Model loading error:', e);
      setLoading(false);
    };

    const handleARStatus = (e: any) => {
      console.log('AR Status:', e.detail.status);
    };

    const handleProgress = (e: any) => {
      console.log('Loading progress:', e.detail.totalProgress);
    };

    modelViewer.addEventListener('load', handleLoad);
    modelViewer.addEventListener('error', handleError);
    modelViewer.addEventListener('ar-status', handleARStatus);
    modelViewer.addEventListener('progress', handleProgress);

    return () => {
      modelViewer.removeEventListener('load', handleLoad);
      modelViewer.removeEventListener('error', handleError);
      modelViewer.removeEventListener('ar-status', handleARStatus);
      modelViewer.removeEventListener('progress', handleProgress);
    };
  }, []);

  const handleARClick = async () => {
    const modelViewer = modelViewerRef.current;
    if (modelViewer && modelViewer.canActivateAR) {
      try {
        await modelViewer.activateAR();
      } catch (error) {
        console.error('Failed to activate AR:', error);
        alert('AR is not supported on this device or browser. Please try on a mobile device with AR capabilities.');
      }
    } else {
      alert('AR is not supported on this device. Please try:\n\n• Android: Use Chrome with ARCore installed\n• iOS: Use Safari on iPhone 6s or newer');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex flex-col">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20 pointer-events-none">
        <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-white pointer-events-auto">
          <h3 className="font-bold text-sm">{item.name}</h3>
          <p className="text-xs text-gray-300">AR Preview (WebXR)</p>
        </div>
        <button 
          onClick={onClose}
          className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors pointer-events-auto"
        >
          <X size={24} />
        </button>
      </div>

      {/* Model Viewer */}
      <div className="w-full h-full relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center text-white z-10">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="animate-spin" size={32} />
              <span className="text-sm font-medium">Loading 3D Model...</span>
            </div>
          </div>
        )}
        
        <model-viewer
          ref={modelViewerRef as any}
          src={item.arModelUrl || item.modelUrl}
          ios-src={item.iosModelUrl}
          poster={item.image}
          alt={`A 3D model of ${item.name}`}
          shadow-intensity="1"
          camera-controls
          auto-rotate
          ar
          ar-modes="scene-viewer webxr quick-look"
          ar-scale={item.arScale || "auto"}
          ar-placement="floor"
          style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
        >
          {/* AR Button using slot - REQUIRED for AR to work properly */}
          <button 
            slot="ar-button"
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-full shadow-lg flex items-center gap-2 transition-transform active:scale-95 z-30"
          >
            <Maximize size={20} />
            <span>View in AR</span>
          </button>

          {/* AR status indicator */}
          {!loading && (
            <div className="absolute bottom-24 left-0 right-0 text-center pointer-events-none text-white/70 text-xs px-4">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Rotate3D size={14} />
                <span>Use one finger to rotate, two to zoom</span>
              </div>
              {arSupported === false && (
                <p className="text-amber-400 mt-2">AR not available - try on mobile with Chrome (Android) or Safari (iOS)</p>
              )}
            </div>
          )}
        </model-viewer>
      </div>
    </div>
  );
};

export default ARViewer;