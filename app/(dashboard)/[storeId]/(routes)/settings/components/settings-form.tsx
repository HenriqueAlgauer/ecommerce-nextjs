'use client'
import { Store } from "@prisma/client"

interface SettingsFormProps {
    initialData: Store
}

const SettingsForm: React.FC<SettingsFormProps> = ({
    initialData
}) => {
    return (
        <>
            Settings Form
        </>
    )
}

export default SettingsForm