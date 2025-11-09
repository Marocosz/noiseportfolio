import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import HomePage from './pages/HomePage';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      smooth: true,
      smoothTouch: true,
      lerp: 0.07,
      easing: (t) => t,
    });


    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return <HomePage />;
}

export default App;
