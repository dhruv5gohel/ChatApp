import { Icon } from "@rsuite/icons"
import { Tag, TagGroup } from "rsuite"

const ProviderBlock = () => {
  return (
    <div className="provider-block">
      <TagGroup>
        <Tag closable>
            <Icon icon="google" /> Connected
        </Tag>
      </TagGroup>
    </div>
  )
}

export default ProviderBlock
