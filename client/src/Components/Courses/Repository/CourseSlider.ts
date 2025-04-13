class CourseSliderRepository {
  public goToPrevious = (setCurrentIndex: React.Dispatch<React.SetStateAction<number>>) => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  public goToNext = (setCurrentIndex: React.Dispatch<React.SetStateAction<number>>, totalSlides: number) => {
    setCurrentIndex((prevIndex) => Math.min(totalSlides - 1, prevIndex + 1));
  };

  public handleResize = (setCardsPerView: React.Dispatch<React.SetStateAction<number>>) => {
    if (window.innerWidth < 640) {
      setCardsPerView(1)
    } else if (window.innerWidth < 1024) {
      setCardsPerView(2)
    } else {
      setCardsPerView(3)
    }
  }
}

export default CourseSliderRepository;
