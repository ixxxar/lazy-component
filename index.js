const {useRef, useState, useEffect} = require("react");

function LazyComponent({ children }) {
  // Create a reference to the element that we want to observe
  const targetElement = useRef(null);
  const [isInView, setIsInView] = useState(false);

  // Set up the intersection observer when the component mounts
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection, {});
    observer.observe(targetElement.current);

    // Clean up the observer when the component unmounts
    return () => observer.unobserve(targetElement.current);
  }, []);

  // This is the callback function that is executed whenever the
  // target element intersects with the viewport
  function onIntersection(entries) {
    // Do something with the intersection data, such as triggering
    // an animation or lazy loading content
    setIsInView(true);
  }

  return (
      <div ref={targetElement}>{isInView ? children : null}</div>
  );
}

module.exports = LazyComponent;
