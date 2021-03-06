<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Image_model extends CI_Model
{
	function __construct()
  {
      parent::__construct();
  }

	function get_category_info()
	{
		$query = $this->db->get('gallery_category');
		$result = $query->result();
		$category_info = array('rows' => $result, 'num_rows' => $query->num_rows());
		return $category_info;
	}

	function get_album_info()
	{
		$query = $this->db->get('gallery_album');
		$result = $query->result();
		return $result;
	}

	// get image
	function get_image($page)
	{
		$this->db->distinct();
		$this->db->from('gallery_image');
		if($page == 'home' || $page == ''){
			$this->db->limit(8);
			$this->db->join('gallery_album', 'gallery_album.album_id = gallery_image.album_id');
			$this->db->group_by('album_title');
		}
		else
			$this->db->group_by('album_id');
    $query = $this->db->get();
		$result = $query->result();
		return $result;
	}

	function get_album_id($album_title)
	{
		$this->db->select('album_id');
		$this->db->where('gallery_album.album_title', $album_title);
		$query = $this->db->get('gallery_album');
		$result = $query->result();
		return $result;
	}

	function get_album_images($album_id)
	{
		$this->db->from('gallery_image');
		$this->db->where('gallery_image.album_id = '.$album_id);
		$this->db->join('gallery_album', 'gallery_album.album_id = '.$album_id);
		$query = $this->db->get();
		$result = $query->result();
		return $result;
	}

	function get_thumbs()
	{
		$this->db->from('gallery_image');
		$this->db->join('gallery_album', 'gallery_album.album_id = gallery_image.album_id');
		$query = $this->db->get();
		$result = $query->result();
		return $result;
	}

	function recent_upload_images()
	{
		$this->db->from('gallery_image');
		$this->db->join('gallery_album', 'gallery_album.album_id = gallery_image.album_id');
		$this->db->limit(4);
		$this->db->order_by("created_at", "desc");
		$query = $this->db->get();
		$result = $query->result();
		return $result;
	}
}?>
