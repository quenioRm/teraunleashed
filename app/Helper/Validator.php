<?php

namespace App\Helper;


class Validator{
    public static function ReturnNewValidation($errors)
    {
        $errorsData[] = [];

        foreach ($errors->all() as $key => $error) {
            $errorsData[$key] = [
                'field' => $key,
                'message' => $error
            ];
        }
    }
}