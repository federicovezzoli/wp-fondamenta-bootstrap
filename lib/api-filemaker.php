<?php

/** Auth
 *
 *
 * https://github.com/WP-API/Basic-Auth

   http://fondamenta.test/wp-json/dbi-filemaker/v1/

   http://fondamenta.test/wp-json/dbi-filemaker/v1/author
   http://fondamenta.test/wp-json/dbi-filemaker/v1/recipe

   Authorization Basic aW5mb0Bkb3QtYWdlbmN5Lml0OmphbWVzNDY0
*/

/**
 * Endpoint for Authors
 *
 */

add_action('rest_api_init', function() {
  register_rest_route( 'dbi-filemaker/v1', '/author/', array(
    'methods' => 'POST',
    'callback' => 'endpoint_author',
  ));
});

function endpoint_author( WP_REST_Request $request ) {

  //get the json body
  $json_data = $request->get_json_params();
  error_log(print_r($json_data["idWordpress"],true));

  //setup the array
  $postarr = array();

  // ?
  //author
  // ?
  $postarr["post_author"] = "";
  //content
  $postarr["post_content"] = $json_data["descrizione"];
  //title
  $postarr["post_title"] = $json_data["nome"]." ".$json_data["cognome"];
  //type
  $postarr["post_type"] = "maestri";
  //meta, a lot
  $postarr["meta_input"] = array(
	  "indirizzo" 	=> $json_data["indirizzo"],
	  "cap" 		=> $json_data["CAP"],
	  "citta" 		=> $json_data["citta"],
	  "provincia" 	=> $json_data["provincia"],
	  "regione" 	=> $json_data["regione"],
	  "nazione" 	=> $json_data["nazione"],
	  "telefono" 	=> $json_data["telefono"],
	  "email" 		=> $json_data["email"],
	  "url" 		=> $json_data["URL"],
	  "facebook" 	=> $json_data["facebook"],
	  "instagram" 	=> $json_data["instagram"],
	  "twitter" 	=> $json_data["twitter"],
	  "linkedin" 	=> $json_data["linkedin"],
	  "google" 		=> $json_data["google"]
  );

  //??
  //immagine
  // ??
  //$postarr["immagine"] = $json_data["immagine"];

  //??
  //tag
  // ??
  //$postarr["tag"] = $json_data["tag"];

  //??
  //locali
  //??
  //error_log(print_r($json_data["locali"],true));
  //$json_data["locali"][0]

  if ($json_data["idWordpress"] != "") {
  	//update author
  	$postarr["ID"] = $json_data["idWordpress"];
  	//status
  	//$postarr["post_status"] = "draft";
  } else {
	//status
	$postarr["post_status"] = "draft";
  }

  //update or create the locale
  //$result= wp_insert_post( $postarr,true);

  //update or create the author
  $result = wp_insert_post( $postarr,true);

  //handle any error
  if ( is_wp_error($result) ) {
    return new WP_Error( 'dbi-filemaker-error', 'Invalid author', array( 'status' => 500 ) );
  }

  //return the id of the created/updated author
  $response_data = array("idWordpress" => $result);
  // Create the response object
  $response = new WP_REST_Response( $response_data );
  // Add a custom status code
  $response->set_status(200);

  return $response;
}

/**
 * Endpoint for Recipe
 *
 * @author     Federico Vezzoli <Federico@dot-agency.it>
 */

add_action('rest_api_init', function() {
  register_rest_route( 'dbi-filemaker/v1', '/recipe/', array(
    'methods' => 'POST',
    'callback' => 'endpoint_recipe',
  ));
});

function endpoint_recipe( WP_REST_Request $request ) {

    //get the json body
  $json_data = $request->get_json_params();
  error_log(print_r($json_data["idWordpress"],true));

  //setup the array
  $postarr = array();

  // ?
  //author
  // ?
  $postarr["post_author"] = "";
  //content
  //????
  //$postarr["post_content"] = $json_data["descrizione"];
  //title
  //??????
  //$postarr["post_title"] = $json_data["titolo"];
  //type
  $postarr["post_type"] = "ricette";
  //meta, a lot
  $postarr["meta_input"] = array(
	  "montaggio" 		=> $json_data["montaggio"],
	  "note" 			=> $json_data["note"],
	  "conservazione" 	=> $json_data["conservazione"],
	  "abbinamenti" 	=> $json_data["abbinamenti"],
  );

  //??
  //immagine
  // ??
  //$postarr["immagine"] = $json_data["immagine"];

  //??
  //tag
  // ??
  //$postarr["tag"] = $json_data["tag"];

  //??
  // Preparazioni
  //??
  foreach ($json_data["preparazioni"] as $preparazione) {
  	$preparazione["preparazione"];
  	$preparazione["procedimento"];
  	foreach ($preparazione["ingredienti"] as $ingrediente) {
  		$ingrediente["ingrediente"];
  		$ingrediente["UM"];
  		$ingrediente["quantita"];
  	}
  }

  //update or create the author
  $result = wp_insert_post( $postarr,true);

  //??
  // Ingredienti principali
  //??
  foreach ($json_data["ingredienti_principali"] as $ingrediente_principale) {
  	$ingrediente = strtolower($ingrediente_principale["ingrediente"]);
  	$ingrediente = str_replace(" ", "-", $ingrediente);

  	$ingredienti_terms_result = wp_set_object_terms($result, $ingrediente, "ingredienti_principali", true);
  }

  //??
  // Portate
  //??
  foreach ($json_data["portate"] as $porata) {
  	$portata_term = strtolower($portata["portata"];);
  	$portata_term = str_replace(" ", "-", $portata_term);

  	$ingredienti_terms_result = wp_set_object_terms($result, $portata_term, "portate", true);
  }

  //??
  // Associazione con il maestro
  //??
  foreach ($json_data["maestri"] as $maestro) {
  	$portata["maestro"];
  	$portata["idWordpress"];
  }


  if ($json_data["idWordpress"] != "") {
  	//update author
  	$postarr["ID"] = $json_data["idWordpress"];
  	//status
  	//$postarr["post_status"] = "draft";
  } else {
	//status
	$postarr["post_status"] = "draft";
  }

  //update or create the locale
  //$result= wp_insert_post( $postarr,true);



  //handle any error
  if ( true ) {
    return new WP_Error( 'dbi-filemaker-error', 'Invalid recipe', array( 'status' => 500 ) );
  }

  //return the id of the created/updated author
  $response_data = array("idWordpress" => $result);
  // Create the response object
  $response = new WP_REST_Response( $response_data );
  // Add a custom status code
  $response->set_status(200);

  return $response;
}