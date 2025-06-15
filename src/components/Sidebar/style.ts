import styled from 'styled-components';

export const Backdrop = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1999;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
`;

export const SidebarContainer = styled.aside<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100%;
  background-color: #202124;
  color: #ffffff;
  z-index: 2000;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.3s ease-in-out;
`;

export const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: bold;
  margin: 0;
`;

export const FilterList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
`;

export const FilterItem = styled.li<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.2s ease;
  background-color: ${({ isActive }) => (isActive ? '#7F92F1' : 'transparent')};
  color: ${({ isActive }) => (isActive ? '#202124' : '#e8eaed')};

  &:hover {
    background-color: ${({ isActive }) => (isActive ? '#7F92F1' : 'rgba(255, 255, 255, 0.1)')};
  }

  svg {
    stroke-width: 2.5px;
  }
`;