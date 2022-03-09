import React, { useState } from "react";
import { useParams } from 'react-router-dom'
import SelectCategory from "../../components/SelectCategory";
import Tabs from '../../components/Tabs';
import SelectForm from "../../components/SelectForm";

const Create = () => {
    const { id } = useParams();
    const [category, setCategory] = useState({});

    return (
        <div>
            <Tabs>
                <div label="支出">
                    <SelectCategory type='outcome' setCategory={setCategory} />
                </div>
                <div label="收入">
                    <SelectCategory type='income' setCategory={setCategory} />
                </div>
            </Tabs>
            <SelectForm category={category} id={id}/>
        </div>
    )
}

export default Create