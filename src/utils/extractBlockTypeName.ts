type ExtractBlockTypeNameProps = {
  blockName: string
  blockType: string
}

export const extractBlockTypeName = ({
  blockName,
  blockType,
}: ExtractBlockTypeNameProps): string => {
  const matches = blockType.match(new RegExp(`${blockName}(.+)Block`))
  return matches ? matches[1] : '' // Extract captured group
}
