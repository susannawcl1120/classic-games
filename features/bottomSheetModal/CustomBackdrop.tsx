import { Pressable, StyleSheet } from 'react-native';
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedStyle,
    useSharedValue
} from 'react-native-reanimated';
import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { useBottomSheet } from '@gorhom/bottom-sheet';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const CustomBackdrop = ({
    animatedIndex,
    isVisible
}: BottomSheetBackdropProps & { isVisible: boolean }) => {
    const { close } = useBottomSheet();

    const lastValidIndex = useSharedValue(-1);
    const animatedStyle = useAnimatedStyle(() => {
        if (animatedIndex.value !== -1) {
            lastValidIndex.value = animatedIndex.value;
        }

        const valueToUse = lastValidIndex.value;
        return {
            opacity: interpolate(valueToUse, [-1, 0], [0, 1], Extrapolation.CLAMP)
        };
    });

    return (
        <AnimatedPressable
            onPress={() => close()}
            style={[
                StyleSheet.absoluteFillObject,
                { backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 0 },
                animatedStyle
            ]}
            pointerEvents={isVisible ? 'auto' : 'none'}
        />
    );
};

export default CustomBackdrop;
