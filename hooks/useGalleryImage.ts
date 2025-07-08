import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { Alert } from 'react-native'

/**
 * Hook para seleccionar una imagen desde la galería del dispositivo.
 * No persiste el resultado, solo mantiene la URI en memoria
 * mientras el componente que lo usa está montado.
 */
export function useGalleryImage() {
  const [imageUri, setImageUri] = useState<string | null>(null)

  /**
   * Abre la galería y permite al usuario escoger una imagen.
   * Si elige una, se guarda su URI en estado.
   */
  const pickImage = async () => {
    // Solicitar permisos de librería
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert(
        'Permiso requerido',
        'Necesitamos permiso para acceder a tu galería de fotos.'
      )
      return
    }

    // Lanzar selector de imágenes
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
      exif: false,
      selectionLimit: 1,
    })

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri)
    }
  }

  /**
   * Permite restablecer la imagen.
   */
  const clearImage = () => setImageUri(null)

  return {
    imageUri,
    pickImage,
    clearImage,
    setImageUri, // expuesto por si se quiere setear manualmente
  }
} 