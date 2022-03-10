import React, { useState } from "react";
import { useParams } from 'react-router-dom'
import SelectCategory from "../../components/SelectCategory";
import Tabs from '../../components/Tabs';
import SelectForm from "../../components/SelectForm";
import { AppContext } from "../../App";
import withContext from "../../withContext";

const Create = props => {
    const {categories, items, actions} = props
    const { id } = useParams();
    const editItem = (id && items[id]) ? items[id] : {};
    const [category, setCategory] = useState((editItem && editItem.cid) ? categories[editItem.cid] : null);

    console.log(editItem);

    function submitForm (data, isEditMode) {
        if(!isEditMode) {
            // create
            actions.createItem(data, category);
        }else {
            // update
            console.log(editItem);
        }
    }

    return (
        <div>
            <Tabs>
                <div label="支出">
                    <SelectCategory type='outcome' category={category} setCategory={setCategory} />
                </div>
                <div label="收入">
                    <SelectCategory type='income' category={category} setCategory={setCategory} />
                </div>
            </Tabs>
            <SelectForm category={category} editItem={editItem} onSubmitForm={submitForm}/>
        </div>
    )
}

export default withContext(Create)