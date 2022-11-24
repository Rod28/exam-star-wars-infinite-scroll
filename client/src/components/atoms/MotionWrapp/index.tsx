import { useState, useMemo, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
// Types
import { MotionWrappProps } from './types';

/**
 * Contenedor que va a dotar de una animación al elemento que
 * esté envuelto en él.
 * @see https://github.com/thebuilder/react-intersection-observer
 */
const MotionWrapp = ({
  startTheView,
  classesIn,
  classesOut,
  options,
  children
}: MotionWrappProps) => {
  // Intersection observer
  const [refView, inView] = useInView({
    triggerOnce: true, // Se puede sobrescribir dentro del prop options
    threshold: 0, // Se puede sobrescribir dentro del prop options
    ...options,
    initialInView: false // No se puede sobrescribir, ya que se controla desde el prop startTheView
  });

  // State
  const [startShow, setStartShow] = useState(false);
  const [availableMotion, setAvailableMotion] = useState(false);

  // Animations
  const endClasses = useMemo(() => {
    const value = startTheView ? startShow : inView;

    // La classesOut solo se moestrara si startShow o inView estan como true.
    return value ? classesOut : '';
  }, [classesOut, inView, startShow, startTheView]);

  // Indica el valor del ref
  const ref = useMemo(() => {
    const _availableMotion = availableMotion ? refView : null;

    return !startTheView ? _availableMotion : null;
  }, [availableMotion, refView, startTheView]);

  /**
   * Agrega un delay antes de mostrar la animación sólo cuando la bandera startTheView
   * este habilitada como true, indicando que no hay desplazamiento que realizar.
   *
   * Esto se hace para que se respete la animacion al mostrar el elemento sin hacer scroll.
   */
  useEffect(() => {
    if (startTheView && !startShow && options?.delay) {
      setTimeout(() => {
        setStartShow(true);
      }, options.delay);
    }
  }, [startTheView, startShow, options?.delay]);

  /**
   * Este efecto esta pensado para resolver el inicio de las animaciones, cuando
   * se navega entre pantallas.
   *
   * Sin el, al hacer scroll visitar una nueva pantalla que contiene este componente,
   * las animaciones inicien, ya que la funcion toScrollTop activa el intersection
   * observer al desplazarse al tope de la pantalla.
   *
   * El setTimeout da tiempo suficiente para que se alcance el tope de la nueva pantalla,
   * y luego se asigne el ref para iniciar el intersection observer.
   */
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAvailableMotion(true);
    }, 200);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div ref={ref} className={`${classesIn} ${endClasses}`}>
      {children}
    </div>
  );
};

MotionWrapp.defaultProps = {
  options: {}
};

export default MotionWrapp;
