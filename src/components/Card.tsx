import React, { useState, useEffect } from 'react';
import { Heart, Gift } from 'lucide-react';
import { CardStage, YesButton } from '../types/CardStage';
import styles from './ValentinesCard.module.css';

const ValentinesCard: React.FC = () => {
  const [stage, setStage] = useState<CardStage>('envelope');
  const [yesButtons, setYesButtons] = useState<YesButton[]>([]);
  const [visibleButtonCount, setVisibleButtonCount] = useState(0);
  const [confetti, setConfetti] = useState<{ x: number; y: number; color: string }[]>([]);

  const handleEnvelopeClick = () => setStage('question');

  const handleNoClick = () => {
    const buttonCount = window.innerWidth < 768 ? 6 : 10;
    const maxDistance = window.innerWidth < 768 ? 120 : 150;
    
    const newButtons: YesButton[] = Array.from({ length: buttonCount }, (_, index) => ({
      id: index,
      x: Math.random() * maxDistance * 2 - maxDistance,
      y: Math.random() * maxDistance * 2 - maxDistance,
      size: Math.random() * 20 + (window.innerWidth < 768 ? 40 : 50),
      visible: false
    }));
    setYesButtons(newButtons);
    setVisibleButtonCount(0);
  };

  const generateConfetti = () => {
    const confettiCount = window.innerWidth < 768 ? 30 : 50;
    const newConfetti = Array.from({ length: confettiCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: -20,
      color: `hsl(${Math.random() * 360}, 80%, 60%)`
    }));
    setConfetti(newConfetti);
  };

  useEffect(() => {
    if (yesButtons.length > 0 && visibleButtonCount < yesButtons.length) {
      const timer = setTimeout(() => {
        setYesButtons(prev => 
          prev.map((button, index) => 
            index === visibleButtonCount ? { ...button, visible: true } : button
          )
        );
        setVisibleButtonCount(prev => prev + 1);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [yesButtons, visibleButtonCount]);

  const handleYesClick = () => {
    setStage('success');
    generateConfetti();
  };

  const renderContent = () => {
    switch (stage) {
      case 'envelope':
        return (
          <div className={styles.envelopeWrapper}>
            <div className={styles.envelope} onClick={handleEnvelopeClick}>
              <div className={styles.envelopeFront}>
                <div className={styles.envelopeFlap}></div>
                <span className={styles.forYouText}>For You ❤️</span>
              </div>
            </div>
          </div>
        );

      case 'question':
        return (
          <div className={styles.questionContainer}>
            <h2 className={styles.questionTitle}>
              Will you be my Valentine?
            </h2>
            
            {yesButtons.map(button => (
              button.visible && (
                <button
                  key={button.id}
                  className={styles.popupYesButton}
                  style={{
                    left: `calc(50% + ${button.x}px)`,
                    top: `calc(50% + ${button.y}px)`,
                    width: `${button.size}px`,
                    height: `${button.size}px`,
                    fontSize: `${button.size / 3}px`,
                  }}
                  onClick={handleYesClick}
                >
                  Yes!
                </button>
              )
            ))}
            
            <div className={styles.buttonContainer}>
              <button onClick={handleNoClick} className={styles.noButton}>
                No way
              </button>
              <button onClick={handleYesClick} className={styles.yesButton}>
                Yes, of course!
              </button>
            </div>
          </div>
        );

      case 'success':
        return (
          <>
            {confetti.map((piece, index) => (
              <div 
                key={index} 
                className={styles.confetti} 
                style={{ 
                  left: piece.x, 
                  backgroundColor: piece.color,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
            <div className={styles.successMessage}>
              <h2 className={styles.successTitle}>
                Yay! ❤️
              </h2>
              <img 
                src="https://media2.giphy.com/media/enrq327a3sMIJAS5jA/200.webp?cid=ecf05e47cv7i9bua9trz48593at9v8tqtjewrdfzqjd4m7xn&ep=v1_gifs_search&rid=200.webp&ct=g" 
                alt="Cute Valentine's Day" 
                className={styles.successImage}
              />
              <div className={styles.iconContainer}>
                <Heart className={styles.icon} color="#FF69B4" fill="#FF69B4" size={40} />
                <Gift className={styles.icon} color="#FF69B4" size={40} />
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {renderContent()}
      </div>
    </div>
  );
};

export default ValentinesCard;