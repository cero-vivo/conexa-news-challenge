import { useEffect } from 'react'
import { Keyboard, KeyboardEvent } from 'react-native'
import {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated'

/**
 * Hook que centraliza la lógica de animaciones y manejo de scroll/teclado
 * para la pantalla `NewsFeedScreen`.
 */
export const useNewsFeedAnimations = () => {
  const headerHeight = useSharedValue(1)
  const searchBarTranslateY = useSharedValue(0)
  const headerOpacity = useSharedValue(1)
  const searchBarScale = useSharedValue(1)

  const logoScale = useSharedValue(1)
  const logoTranslateX = useSharedValue(0)
  const logoTranslateY = useSharedValue(0)
  const logoOpacity = useSharedValue(1)

  const scrollY = useSharedValue(0)
  const isScrolling = useSharedValue(false)
  const scrollDirection = useSharedValue(0)

  const handleScroll = (event: any) => {
    const currentOffset = event.nativeEvent.contentOffset.y
    const previousOffset = scrollY.value
    scrollY.value = currentOffset

    if (currentOffset > previousOffset) {
      scrollDirection.value = 1
    } else if (currentOffset < previousOffset) {
      scrollDirection.value = -1
    }

    isScrolling.value = true

    if (currentOffset > 10 && scrollDirection.value === 1 && isScrolling.value) {
      headerHeight.value = withTiming(0, { duration: 300 })
      headerOpacity.value = withTiming(0, { duration: 300 })
      logoScale.value = withTiming(0.8, { duration: 300 })
      logoTranslateX.value = withTiming(0, { duration: 300 })
      logoTranslateY.value = withTiming(-30, { duration: 300 })
      logoOpacity.value = withTiming(1, { duration: 300 })
    } else if (scrollDirection.value === -1 || currentOffset < 10) {
      headerHeight.value = withTiming(1, { duration: 300 })
      headerOpacity.value = withTiming(1, { duration: 300 })
      logoScale.value = withTiming(1, { duration: 300 })
      logoTranslateX.value = withTiming(0, { duration: 300 })
      logoTranslateY.value = withTiming(0, { duration: 300 })
      logoOpacity.value = withTiming(1, { duration: 300 })
    }
  }

  const handleScrollBeginDrag = () => {
    isScrolling.value = true
  }

  const handleScrollEndDrag = () => {
    isScrolling.value = false
    if (scrollY.value < 50) {
      headerHeight.value = withTiming(1, { duration: 300 })
      headerOpacity.value = withTiming(1, { duration: 300 })
      logoScale.value = withTiming(1, { duration: 300 })
      logoTranslateX.value = withTiming(0, { duration: 300 })
      logoTranslateY.value = withTiming(0, { duration: 300 })
      logoOpacity.value = withTiming(1, { duration: 300 })
    }
  }

  const handleMomentumScrollEnd = () => {
    isScrolling.value = false
    if (scrollY.value < 50) {
      headerHeight.value = withTiming(1, { duration: 300 })
      headerOpacity.value = withTiming(1, { duration: 300 })
      logoScale.value = withTiming(1, { duration: 300 })
      logoTranslateX.value = withTiming(0, { duration: 300 })
      logoTranslateY.value = withTiming(0, { duration: 300 })
      logoOpacity.value = withTiming(1, { duration: 300 })
    }
  }

  const onKeyboardShow = (_e: KeyboardEvent) => {
    const d = 250
    headerHeight.value = withTiming(0, { duration: d })
    headerOpacity.value = withTiming(0, { duration: d })
    searchBarTranslateY.value = withTiming(-5, { duration: d })
    searchBarScale.value = withTiming(1.01, { duration: d })
    logoScale.value = withTiming(0.8, { duration: d })
    logoTranslateX.value = withTiming(0, { duration: d })
    logoTranslateY.value = withTiming(-30, { duration: d })
    logoOpacity.value = withTiming(1, { duration: d })
  }

  const onKeyboardHide = () => {
    const d = 250
    headerHeight.value = withTiming(1, { duration: d })
    headerOpacity.value = withTiming(1, { duration: d })
    searchBarTranslateY.value = withTiming(0, { duration: d })
    searchBarScale.value = withTiming(1, { duration: d })
    logoScale.value = withTiming(1, { duration: d })
    logoTranslateX.value = withTiming(0, { duration: d })
    logoTranslateY.value = withTiming(0, { duration: d })
    logoOpacity.value = withTiming(1, { duration: d })
  }

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', onKeyboardShow)
    const hideSub = Keyboard.addListener('keyboardDidHide', onKeyboardHide)
    return () => {
      showSub?.remove()
      hideSub?.remove()
    }
  }, [])

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    height: interpolate(headerHeight.value, [0, 1], [0, 120]),
    opacity: headerOpacity.value,
    transform: [{ translateY: interpolate(headerHeight.value, [0, 1], [-10, 0]) }],
  }))

  const searchBarAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: searchBarTranslateY.value },
      { scale: searchBarScale.value },
    ],
    shadowOpacity: interpolate(searchBarScale.value, [1, 1.01], [0, 0.08]),
    shadowRadius: interpolate(searchBarScale.value, [1, 1.01], [0, 6]),
    elevation: interpolate(searchBarScale.value, [1, 1.01], [0, 3]),
  }))

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: logoScale.value },
      { translateX: logoTranslateX.value },
      { translateY: logoTranslateY.value },
    ],
    opacity: logoOpacity.value,
  }))

  return {
    headerAnimatedStyle,
    searchBarAnimatedStyle,
    logoAnimatedStyle,
    handleScroll,
    handleScrollBeginDrag,
    handleScrollEndDrag,
    handleMomentumScrollEnd,
  }
}
