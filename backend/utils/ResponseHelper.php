<?php
class ResponseHelper
{
    public static function json($data, $code = 200)
    {
        http_response_code($code);
        return json_encode($data);
    }
}