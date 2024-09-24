import { useState } from 'react'

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEntity, setSelectedEntity] = useState(null)
  const toggleModal = (entity?:any) => {
    setSelectedEntity(entity)
    setIsModalOpen(!isModalOpen)
  }
  return {isModalOpen, toggleModal, selectedEntity, setSelectedEntity, setIsModalOpen}
}
