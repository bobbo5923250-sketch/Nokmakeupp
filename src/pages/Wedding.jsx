import React from 'react';
import GalleryPage from './GalleryPage';

const modules = import.meta.glob('../img/wedding/*.{jpg,jpeg,png,JPG,JPEG,PNG}', { eager: true });

const Wedding = () => (
  <GalleryPage
    modules={modules}
    eyebrow="Bridal portfolio"
    title="Wedding"
    accent="Makeup"
    copy="คัดผลงานแต่งหน้าเจ้าสาวที่เน้นผิวสวยละมุน โครงหน้าชัด และถ่ายรูปขึ้นกล้อง เหมาะสำหรับดู reference ก่อนคุยลุคจริง"
  />
);

export default Wedding;
