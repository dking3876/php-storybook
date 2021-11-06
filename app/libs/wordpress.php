<?php 

function get_field($fieldName, $location = null){
    global $blocks_path, $current_block;
    //check if the fieldname exists int he parameters from post OR use the default set in json file
    $fields = file_get_contents($blocks_path.DIRECTORY_SEPARATOR.$current_block.DIRECTORY_SEPARATOR.$current_block.'.json');
    $fields = json_decode($fields);
    $selectedField = array_filter($fields->fields, function($fieldset) use ($fieldName){
        $type = array_keys(get_object_vars($fieldset))[0];
        if($fieldset->$type->name == $fieldName){
            return $fieldset;
        }
    });
    if($selectedField){
        return $selectedField[0];
    }
}

function generate_image_tag($url, $size = 'thumbnail'){

    return sprint_f('<img src="%s" class="%s" loading="lazy" />', $url, $size);
}

function get_data_set($dataSetName){

}
?>