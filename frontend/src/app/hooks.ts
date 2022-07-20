import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import { useEffect, useMemo, useState } from 'react'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useInView = (ref:any)=>{
    const [isIntersecting, setIsIntersecting] = useState(false);

    const observer = useMemo(
        () =>
          new IntersectionObserver(([entry]) =>
            setIsIntersecting(entry.isIntersecting),
          ),
        [],
      );

      useEffect(() => {
        observer.observe(ref.current);
    
        return () => {
          observer.disconnect();
        };
      }, [ref, observer]);
    
      return isIntersecting;

}