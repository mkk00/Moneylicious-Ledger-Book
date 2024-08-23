import { supabase } from '@/supabaseconfig'
import { AssetsProps, AssetsTargetProps } from '@/interface/AssetsProps'

const selectIlliquidAsset = async () => {
  try {
    const { data, error } = await supabase
      .from('assets')
      .select('*')
      .eq('type', '비유동자산')
      .returns<AssetsProps[] | null>()

    if (error) throw error.message

    return data
  } catch (error) {
    console.error(error)
  }
}

const insertAsset = async (assetData: Partial<AssetsProps>) => {
  try {
    const { data, error } = await supabase
      .from('assets')
      .insert(assetData)
      .select('id')

    if (error) throw error

    return data
  } catch (error) {
    console.error(error)
  }
}

const updateAsset = async (id: string, insertData: Partial<AssetsProps>) => {
  try {
    const { data, error } = await supabase
      .from('assets')
      .update(insertData)
      .eq('id', id)
      .select('id')

    if (error) throw error.message

    return data
  } catch (error) {
    console.error(error)
  }
}

const deleteAsset = async (id: string) => {
  try {
    const { error } = await supabase.from('assets').delete().eq('id', id)

    if (error) throw error
  } catch (error) {
    console.error(error)
  }
}

const selectAssetsTarget = async () => {
  try {
    const { data, error } = await supabase
      .from('assetsTarget')
      .select()
      .returns<AssetsTargetProps[] | null>()

    if (error) throw error.message

    return data
  } catch (error) {
    console.error(error)
  }
}

export {
  selectIlliquidAsset,
  insertAsset,
  updateAsset,
  deleteAsset,
  selectAssetsTarget
}
