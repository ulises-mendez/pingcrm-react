<?php

namespace App\Http\Controllers;

use App\Models\Portfolio;
use Illuminate\Http\Request;
use App\Http\Requests\StorePortfolioRequest;
use App\Http\Requests\PortfolioUpdateRequest;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;


class PortfolioController extends Controller
{
    public $hasError;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePortfolioRequest $request)
    {
        /*
        Portfolio::create(
            $request->validated()
        );
        */
        // Retrieve the validated input data...

        
        $validated = $request->validated();

        return Redirect::route('posts.index')->with('success', 'Portfolio created.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Portfolio  $portfolio
     * @return \Illuminate\Http\Response
     */
    public function show(Portfolio $portfolio)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Portfolio  $portfolio
     * @return \Illuminate\Http\Response
     */
    public function edit(Portfolio $portfolio)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Portfolio  $portfolio
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Portfolio $portfolio)
    {
        /*
        $portfolio->update(
            $request->validated()
        );
        */
        $limit = 8300;
        $sum = Portfolio::where('user_id', 2)->sum('amount');
        $thePorfolio = Portfolio::find($portfolio->id);
        $originalAmount = $thePorfolio->amount;
        $acumulated = $sum - $originalAmount;
        $amount = $request->get('amount');

        $validator = Validator::make($request->all(), [
            'amount' => 'numeric|required|min:1000',
            'type' => 'required',
        ],
        [
            'amount.min' => 'El monto mínimo de inversión es de $1000.00',
            'amount.numeric' => 'Declara una cantidad valida',
        ]);

        if($acumulated + $amount > $limit){
            // $validator->errors()->add('amount', 'El monto total de inversión no puede superar los '. $limit);
            return Redirect::route('posts.index')->withErrors(['amount'=>'Monto disponible superado']);
        }


        if($amount % 100) {
            return Redirect::route('posts.index')->withErrors(['amount'=>'El monto debe ser multiplo de 100']);
        }

        if ($validator->fails()) {
            return Redirect::route('posts.index')->withErrors($validator);
        }
        
        $portfolio->update(
            $request->all()
        );

        return Redirect::route('posts.index')->with('success', 'Portafolio de inversiones actualizado.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Portfolio  $portfolio
     * @return \Illuminate\Http\Response
     */
    public function destroy(Portfolio $portfolio)
    {
        $portfolio->delete();
        return Redirect::route('posts.index')->with('success', 'Portfolio deleted.');
    }
}
