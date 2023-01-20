import { Modal } from 'antd';

type EventModalProps = {
  children: JSX.Element;
  showModal: boolean;
  onSave: () => void;
  onCancel: () => void;
};
export default function EventModal({ children, showModal, onSave, onCancel }: EventModalProps) {
  return (
    <Modal title={<p>CREATE EVENT</p>} open={showModal} onOk={onSave} onCancel={onCancel} okText="Save" footer={<></>}>
      {children}
    </Modal>
  );
}
