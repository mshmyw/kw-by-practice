import React, { useEffect, useRef, useState } from "react"
import "./index.css"
/** vertical carousel 参考：https://codepen.io/paras594/pen/JzjwJK */
interface CarouselSimpleProps {
    visible?: boolean
    setVisibleFn?: (visible: boolean) => void
}
const CarouselSimple = (props: CarouselSimpleProps) => {
    const colorList = [
        "#3867d6", "#20bf6b", "#eb3b5a",
    ]
    const colorMapList = colorList.map((color, index) => {
      return <div key={index} className="slide" style={{background: color}}>
        {index}
      </div>
    })
    const itemList = [
      ...colorMapList,
      <div className="slide" style={{background: colorList[0]}} id='firstClone'>
        {0}
      </div>
    ]

    const itemIndexRef = useRef(0)
    const carouselRef = useRef<any>(null)
    const [carouselStyle, setCarouselStyle]=useState({
      transition: 'transform 0.5s ease',
      transform: `translateY(0)`
    })

    useEffect(() => {
        if(!carouselRef.current) {
            return
        }
        const slideList = carouselRef.current.querySelectorAll(".slide");
        const size = slideList[0].clientHeight;
        //to set the slide one as the first slide instead of the clone
        setCarouselStyle({
          ...carouselStyle,
          transform: `translateY(${-size * itemIndexRef.current}px)`
        })
        //looping the slider every 2s
        setInterval(()=>{
          itemIndexRef.current = (itemIndexRef.current+1) % slideList.length
          setCarouselStyle({
            transition: `transform 0.5s ease`,
            transform: `translateY(${-size * itemIndexRef.current}px)`
          })
        },2000);

        carouselRef.current.addEventListener('transitionend', () => {
          if(slideList[itemIndexRef.current]?.id === 'firstClone'){
            itemIndexRef.current = 0;
            setCarouselStyle({
              transition: `none`,
              transform: `translateY(0)`
            })
          }
        });
    }, [])
    return (
        <div className="carousel-demo">
            <div className="carousel-viewport">
                <div className="carousel" style={carouselStyle} ref={carouselRef}>
                  {itemList}
                  {/* <div className="slide" style={{background: colorList[0]}}>one</div>
                  <div className="slide" style={{background: colorList[1]}}>two</div>
                  <div className="slide" style={{background: colorList[2]}}>three</div>
                  <div className="slide" style={{background: colorList[0]}} id='firstClone'>one</div> */}
                </div>
            </div>
        </div>
      )
}

export default CarouselSimple
