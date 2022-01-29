<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Portfolio;

class PortfolioUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
    */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'amount.number' => 'Declara una cantidad válida.',
            'amount.max' => 'Monto máximo alcanzado.',
            'type.required' => 'Selecciona un tipo de transacción.',
        ];
    }


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $sum = Portfolio::where('user_id', 2)->sum('amount');
        $max = 2000;
        return [
            'amount' => 'numeric|required|max:2000|min:1000',
            'type' => 'required',
        ];
    }
}
