import React, {FC, useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import styles from './AddForm.module.css'
import ProductService from "../services/ProductService";

const AddForm: FC = () => {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [priceString, setPrice] = useState<string>('');
    const [preview, setPreview] = useState<string>('');

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const base64Image = e.target?.result as string;
                setPreview(base64Image);
            };

            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        try {
            const price = Number(priceString);
            await ProductService.createProduct({ preview, name, description, price });

            setName('');
            setDescription('');
            setPrice('');
            setPreview('');

        } catch (error) {
            console.error('Ошибка при добавлении продукта:', error);
        }
    };

    return (
        <div className={styles.addForm}>
            <div className={styles.formTitle}>Новый продукт</div>
            <div className={styles.addPreview}>

                <div className={styles.addLabel}>Добавить фото +</div>
                <input type="file"
                       className={styles.imageIn}
                       id="imageInput"
                       accept="image/*"
                       onChange={handleImageUpload}/>
               
            </div>
            <input
                className={styles.textbox}
                name="name"
                placeholder="Название"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                className={styles.textbox}
                name="description"
                placeholder="Описание"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                className={styles.textbox}
                name="price"
                placeholder="Цена"
                value={priceString}
                onChange={(e) => setPrice(e.target.value)}
            />
            <button className={styles.button} onClick={handleSubmit}>Добавить</button>
        </div>
    );
};

export default observer(AddForm);